import type { ChangeEvent, FC } from 'react';
import React, { useEffect } from 'react';
import Overload from '../../../interfaces/Overload';
import { FormTextData } from '../../../interfaces/Properties';

import { TextInput as CTextInput, ITextInput as TextInputProps } from '../../TextInput/TextInput';

interface ITextInput extends Overload<TextInputProps> {
    /** Name is required for text inputs inside of form, having none will throw */
    name: string;
}

/**
 * Client-Side fromatted text input for client side form
 *
 * @return formatted text input
 */
const TextInput: FC<ITextInput> = ({
    parentProps: { register, setValue, setError, clearErrors, errors },
    name,
    required,
    label,
    validator,
    onChange,
    ...props
}) => {
    // when using the client side form, we want to enforce names
    useEffect(() => {
        if (!name?.length) throw new Error('Must use TextInput `name` prop when using Form.');

        // register component manually and create validation requirements for submission
        register(name, {
            required: { value: required, message: `${label} is required.` },
            validate: {
                validator: (d: FormTextData): string | boolean => {
                    if (!validator) return true; // if there isn't a validator, automatically pass

                    // get the error and return if truthy else pass
                    const error = validator(d);
                    return error?.length ? error : true;
                },
            },
        });
    }, []);

    /**
     * Method that will handle on change validation while also allowing user-fed onChange callback
     *
     * @param event form event containing value
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // extract value
        const {
            target: { value },
        } = event;

        // handle onChange
        onChange && onChange(event);

        // update value on record
        const textData: FormTextData = { text: value };
        setValue(name, textData);

        // check for required errors and update on input
        if (errors[name]?.type === 'required' && value.length) {
            clearErrors(name);
        }

        // check if there is defined validator
        if (!validator) return;

        // check if there is an error
        const error = validator(textData);
        if (!error?.length) {
            // see if there was previously an error registered under this component
            if (errors[name]?.message?.length) clearErrors(name);
            return;
        }

        // check if we need to update errors
        if (!errors[name]?.message?.length) setError(name, { type: 'text-input', message: error });
    };

    return (
        <CTextInput
            {...props}
            required={required}
            name={name}
            label={label}
            onChange={handleChange}
            invalid={Boolean(errors[name])}
            errorMessage={String(errors[name]?.message)}
        />
    );
};

export default TextInput;
