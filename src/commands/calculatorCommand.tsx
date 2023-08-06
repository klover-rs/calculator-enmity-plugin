import { ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType, Command } from "enmity/api/commands";
import { sendReply } from "enmity/api/clyde";
import { filters, bulk } from 'enmity/metro';
import { Toasts } from "enmity/metro/common";
import { getIDByName } from 'enmity/api/assets'

const [Clipboard] = bulk(filters.byProps('setString'));

export const InformationCommand: Command = {
    id: "calculator-command",

    name: "calculator",
    displayName: "calculator",

    description: "a simple calculator",
    displayDescription: "a simple calculator",

    type: ApplicationCommandType.Chat,
    inputType: ApplicationCommandInputType.BuiltInText,

    options: [{
		name: "value1",
		displayName: "value1",

		description: "the first value",
		displayDescription: "the first valu",

		type: ApplicationCommandOptionType.String,
		required: true
	},
    {
        name: "operator",
        displayName: "operator",

        description: "the operator (+, -, * or /)",
        displayDescription: "the operator (+, -, * or /)",

        type: ApplicationCommandOptionType.String,
        required: true
    },
	{
		name: "value2",
		displayName: "value2",

		description: "the second value",
		displayDescription: "the second value",

		type: ApplicationCommandOptionType.String,
		required: true

	},
    {
        name: "clipboard",
        displayName: "clipboard",

        description: "copy the result to your clipboard",
        displayDescription: "copy the result to your clipboard",

        type: ApplicationCommandOptionType.Boolean,
        required: false
    }],

    execute: async function (args, message) {

        var value_1 = args.find(x => x.name == "value1")?.value;
        var value_2 = args.find(x => x.name == "value2")?.value;
        var op = args.find(x => x.name == "operator")?.value;
        var clipboard = args.find(x => x.name == "clipboard")?.value;

        let color = "0x1b80ff";
        const pi = 3.14; 

        
        function convertToFloat(inputString) {
            // Check if the inputString contains a comma (indicating a float)
            if (inputString.includes(',')) {
              // Replace the comma with a dot
              inputString = inputString.replace(',', '.');
            }
          
            // Convert the string to a float using parseFloat()
            const floatValue = parseFloat(inputString);

            if (isNaN(floatValue)) {
                return NaN;
            }
          
            return floatValue;
        }

        var _value1 = convertToFloat(value_1);
        var _value2 = convertToFloat(value_2);

        if (value_1.toLowerCase() === "pi") {
            _value1 = pi;
        }
    
        if (value_2.toLowerCase() === "pi") {
            _value2 = pi;
        }

        if (isNaN(_value1) || isNaN(_value2)) {
            return sendReply(message?.channel.id ?? "0", { content: "please enter a valid number"});
        }

        let result;
        switch(op) {
            case '+':
                result = _value1 + _value2;
                break;
            case '-':
                result = _value1 - _value2;
                break;
            case '*':
                result = _value1 * _value2;
                break;
            case '/':
                result = _value1 / _value2;
                break;
            default: return sendReply(message?.channel.id ?? "0", { content: 'invalid operator' });
        }
        

        const embed = {
            type: 'rich',
            title: 'Calculator',
            description: `${_value1} ${op} ${_value2} = ${result}`,
           
            color: color
            
        }

        

        if (clipboard) {
            Clipboard.setString(result.toString())
            Toasts.open({
                content: "copied result to clipboard!",
                source: getIDByName("Check")
            })
        }
        //sendReply(message?.channel.id ?? "0", { embeds: [embed]});
        sendReply(message?.channel.id ?? "0", { embeds: [embed]});
    }
}
