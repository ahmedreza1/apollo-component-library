import React from 'react';
import Overload from '../../../interfaces/Overload';
import FormatChildren from '../../../util/FormatChildren';

import Button from './Button';
import { Props } from '../../ButtonGroup/ButtonGroup';

/**
 * Overloads ButtonGroup to change style and pass through modal actions
 *
 * @return Formatted ButtonGroup
 */
const ButtonGroup: React.FC<Overload<Props>> = ({
    parentProps: { children, ...parentProps },
    ...props
}: Overload<Props>) => {
    // find the buttons in the button group
    const formattedButtonGroup = new FormatChildren({ ...props, ...parentProps }, [Button]);

    // check that there are only buttons in the button group
    if (formattedButtonGroup.getOther().length > 0)
        throw new Error('Only buttons are allowed in button groups');

    return (
        <div className="apollo-component-library-modal-component-button-group">
            {formattedButtonGroup.getAll()}
        </div>
    );
};

export default ButtonGroup;
