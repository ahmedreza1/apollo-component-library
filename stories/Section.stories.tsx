import React from 'react';
import { Section, ISection } from '../src/components/Section/Section';
import { Meta, Story } from '@storybook/react';

const meta: Meta = {
    title: 'Interfacing/Section',
    component: Section,
    args: {
        flex: '1',
        height: '100',
        width: '100',
        minWidth: '1',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export default meta;

/**
 * Template for Section component
 *
 * @param args arguments for section
 * @return template
 */
const Template: Story<ISection> = (args) => (
    <div style={{ display: 'flex', height: 300, width: 500 }}>
        <Section {...args} style={{ background: 'red' }}>
            1
        </Section>
        <Section style={{ background: 'blue' }} alignItems="center" justifyContent="space-around">
            2
        </Section>
    </div>
);

export const Default = Template.bind({});
