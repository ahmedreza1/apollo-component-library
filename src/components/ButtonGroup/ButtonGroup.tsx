import React, { HTMLAttributes, ReactNode } from 'react';
import './ButtonGroup.css';

import FormatChildren from '../../util/FormatChildren';
import { StyleVariant, ComponentSize } from '../../interfaces/Properties';

import Button from './overload/Button';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Disables all buttons within button group */
    disabled?: boolean;
    /** toggle between different button group sizes */
    size?: ComponentSize;
    /** requires children */
    children: ReactNode;
    /** select from preset style */
    variant?: StyleVariant;
}

/**
 * Component that formats buttons in a way that groups them together
 *
 * @return ButtonGroup component
 */
export const ButtonGroup: React.FC<Props> = ({
    children,
    variant = 'default',
    disabled = false,
    size = 'medium',
    className,
    ...props
}: Props): JSX.Element => {
    /**
     * Renders all button group buttons and caches chlidren
     *
     * @return formatted buttons
     */
    const renderButtons = (): JSX.Element[] => {
        // get new formatted children
        const formatted = new FormatChildren({ children, disabled, size, variant }, [Button]);
        if (formatted.getOther().length)
            throw new Error('ButtonGroup can only accept Buttons as children');

        return formatted.getAll();
    };

    return (
        <div {...props} className={`apollo-component-library-button-group-component ${className}`}>
            {renderButtons()}
        </div>
    );
};