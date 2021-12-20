import React from 'react';
import FormatChildren from '../../../util/FormatChildren';

import ButtonGroup from './ButtonGroup';
import { Props, Footer as CFooter } from '../../Footer/Footer';

/**
 * Overloaded Footer that identifies button groups
 *
 * @return formatted footer
 */
const Footer: React.FC<Props> = ({
    parentProps: { children, ...parentProps },
    ...props
}: Props) => {
    // find button groups
    const formattedFooter = new FormatChildren({ ...props, ...parentProps }, [ButtonGroup]);

    // format and extract button groups
    const buttonGroups = formattedFooter.get(ButtonGroup);

    // check that there is no more than one button group
    if (buttonGroups.length > 1)
        throw new Error('The Footer of the Modal can only have 1 ButtonGroup component');

    // get the button group
    const [buttonGroup] = buttonGroups;

    return (
        <CFooter {...props} parentProps={parentProps} style={footerStyle}>
            {formattedFooter.getOther()}
            {buttonGroup}
        </CFooter>
    );
};

// style for footer
const footerStyle: React.CSSProperties = {
    position: 'relative',
};

export default Footer;
