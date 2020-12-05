TEAMS_WEBHOOK_URL = 'https://outlook.office.com/webhook/f3e8c87f-d923-46ca-851f-5fba4f8d7615@4e2ea493-19ed-4eb3-859e-7ecd8c223386/JenkinsCI/b0d0ba929d264212bffb9bf45567634a/86a00bc0-7031-48a1-b23a-8dcdf1629f62'
COLORS = [
    green: "#00FF00",
    red: "#FF0000",
    yellow: "#FFFF00",
    blue: "#0080FF"
]
GITLAB_PIPELINES_URL = 'https://gitlab.vailsys.com/interns2020/freeclimb-cli/-/commit'

def getEmailFromCommit(int commitIndex = 0) {
    def oneIndexedCommitIndex = commitIndex + 1
    def commitEmails = sh(
        script: "git log -${oneIndexedCommitIndex} --pretty=format:'%ae'",
        returnStdout: true
    ).trim().split('\n')
    return commitEmails[commitIndex]
}

def getActiveDeveloperEmail() {
    def firstTwoWordsOfLatestCommitMessage = sh(
        script: 'git log -n 1 --pretty=format:%B | head -n 1 | cut -d " " -f 1,2',
        returnStdout: true
    ).trim()
    def committerEmail = firstTwoWordsOfLatestCommitMessage == 'Merge branch'
        ? getEmailFromCommit(1)
        : getEmailFromCommit(0)
    return committerEmail
}

def getUsernameFromEmail(String email) {
    return email.split('@')[0].toLowerCase()
}

def sendBuildInitiationNotification(String user, String commit) {
    def message = """
    <h2>Build started for ${env.JOB_NAME} ${env.BUILD_DISPLAY_NAME}</h2>
    <h3>
        <a href="${GITLAB_PIPELINES_URL}/${commit}/pipelines?ref=${env.BRANCH_NAME}">View Stages In Gitlab</a>
    </h3>
    <pre>User: ${user}</pre>
    """.replace("\n", " ")

    office365ConnectorSend color: COLORS.blue, message: message, webhookUrl: "${TEAMS_WEBHOOK_URL}", status: currentBuild.result
}

def sendBuildCompletionNotification(String user, String commit) {
    def message = """
    <h2>Build completed for ${env.JOB_NAME} ${env.BUILD_DISPLAY_NAME}</h2>
    <h3>
        <a href="${GITLAB_PIPELINES_URL}/${commit}/pipelines?ref=${env.BRANCH_NAME}">View Stages In Gitlab</a>
    </h3>
    <pre>User: ${user}</pre>
    """.replace("\n", " ")

    def color = COLORS.green
    if (currentBuild.result != 'SUCCESS') {
        color = COLORS.red
    }

    office365ConnectorSend color: color, message: message, webhookUrl: "${TEAMS_WEBHOOK_URL}", status: currentBuild.result
}

def image
def username
def slackUserTag
def commit
def activeDeveloperEmail

pipeline {
    agent {
        label 'kubernetes-docker'
    }

    options {
        timestamps()
        gitLabConnection('gitlab.vailsys.com')
        disableConcurrentBuilds()
    }

    triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
    }
    environment {
        DOCKER_REGISTRY_URL = 'https://shipyard-dev.vail'
        NODE_ENV = "test"
    }

    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    updateGitlabCommitStatus(name: 'Prepare Environment', state: 'running')
                    commit = gitCommit()
                    activeDeveloperEmail = getActiveDeveloperEmail()
                    username = getUsernameFromEmail(activeDeveloperEmail)
                    slackUserTag = "@${username}"
                    sendBuildInitiationNotification(username, commit)
                }
            }
            post {
                success {
                    updateGitlabCommitStatus(name: 'Prepare Environment', state: 'success')
                }
                failure {
                    updateGitlabCommitStatus(name: 'Prepare Environment', state: 'failed')
                }
                aborted {
                    updateGitlabCommitStatus(name: 'Prepare Environment', state: 'canceled')
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    updateGitlabCommitStatus(name: 'Build', state: 'running')
                    def dockerRegistryTag = "persephony/freeclimb-cli:${commit}"

                    image = dockerMultiStageBuild(name: dockerRegistryTag)[0]
                }
            }
            post {
                success {
                    updateGitlabCommitStatus(name: 'Build', state: 'success')
                }
                failure {
                    updateGitlabCommitStatus(name: 'Build', state: 'failed')
                }
                aborted {
                    updateGitlabCommitStatus(name: 'Build', state: 'canceled')
                }
            }
        }

        stage('Static Code Analysis') {
            steps {
                script {
                    updateGitlabCommitStatus(name: 'Static Code Analysis', state: 'running')
                    image.inside('-u 0:0') {
                        sh('cd $APP_PATH && yarn lint')
                    }
                }
            }
            post {
                success {
                    updateGitlabCommitStatus(name: 'Static Code Analysis', state: 'success')
                }
                failure {
                    updateGitlabCommitStatus(name: 'Static Code Analysis', state: 'failed')
                }
                aborted {
                    updateGitlabCommitStatus(name: 'Static Code Analysis', state: 'canceled')
                }
            }
        }

        stage('Unit Test') {
            steps {
                script {
                    updateGitlabCommitStatus(name: 'Unit Test', state: 'running')
                    image.inside('-u 0:0 --cap-add=IPC_LOCK') {
                        sh('/bin/bash -c \'export $(dbus-launch); echo "" | gnome-keyring-daemon --unlock; /usr/bin/gnome-keyring-daemon --components=secrets,pkcs11,ssh --start --daemonize; export $(echo "" | /usr/bin/gnome-keyring-daemon -r -d --unlock) && cd /freeclimb-cli && export SHELL && yarn test\'')
                    }
                }
            }
            post {
                success {
                    updateGitlabCommitStatus(name: 'Unit Test', state: 'success')
                }
                failure {
                    updateGitlabCommitStatus(name: 'Unit Test', state: 'failed')
                }
                aborted {
                    updateGitlabCommitStatus(name: 'Unit Test', state: 'canceled')
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    updateGitlabCommitStatus(name: 'Push Docker Image', state: 'running')
                    image.push(commit)
                }
            }
            post {
                success {
                    updateGitlabCommitStatus(name: 'Push Docker Image', state: 'success')
                }
                failure {
                    updateGitlabCommitStatus(name: 'Push Docker Image', state: 'failed')
                }
                aborted {
                    updateGitlabCommitStatus(name: 'Push Docker Image', state: 'canceled')
                }
            }
        }
    }

    post {
        always {
            script {
                sendBuildCompletionNotification(username, commit)
            }
        }
    }
}

