import Index from "@oclif/plugin-autocomplete/lib/commands/autocomplete"

export class CustomAutocomplete extends Index {
    static description = "Display autocomplete installation instructions"

    log(value: string) {
        super.log(
            value.replace(
                /Add the autocomplete env var to your [a-z]+ profile and source it/,
                "Copy the following line and run it in your terminal. It will set the FreeClimb CLI autocomplete to load on shell startup."
            )
        )
    }
}
