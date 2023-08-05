import { ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType, Command } from "enmity/api/commands";
import { sendReply } from "enmity/api/clyde";


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

	}],

    execute: async function (args, message) {

        var value_1 = args.find(x => x.name == "value1")?.value;
        var value_2 = args.find(x => x.name == "value2")?.value;
        let op = args.find(x => x.name == "operator")?.value;

        let color = "#498ef1"

        
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


        //sendReply(message?.channel.id ?? "0", { embeds: [embed]});
        sendReply(message?.channel.id ?? "0", { embeds: [embed]});
    }
}
