import type { FC } from 'react';
import React from 'react';
import Overload from '../../../interfaces/Overload';
import FormatChildren from '../../../util/FormatChildren';

import Button from './Button';
import { IButtonGroup } from '../../ButtonGroup/ButtonGroup';

/**
 * Overloads ButtonGroup to change style and pass through modal actions
 *
 * @return Formatted ButtonGroup
 */
const ButtonGroup: FC<Overload<IButtonGroup>> = ({
    parentProps: { children, ...parentProps },
    className = '',
    ...props
}: Overload<IButtonGroup>) => {
    // get all props
    const allProps = { ...props, ...parentProps };

    // find the buttons in the button group
    const formattedButtonGroup = new FormatChildren(allProps, { Button });

    // check that there are only buttons in the button group
    if (formattedButtonGroup.getOther().length > 0)
        throw new Error('Only buttons are allowed in button groups');

    return (
        <div className={`apollo-component-library-modal-component-button-group ${className}`}>
            {formattedButtonGroup.getAll()}
        </div>
    );
};

export default ButtonGroup;
