import React from 'react';
import { screen, render } from '@testing-library/react';

import { LoadingState } from '../src';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

// inside test
it('...', async () => {
    // given: you need to test all variants of this component, make sure all states are present
    const { container: progressBar } = render(
        <LoadingState loading name="LoadedProgressBar" label="progressbar_id" />
    );
    /* Add other states of the same component */

    // when
    const results = [];
    results[0] = await axe(progressBar);
    /* get axe results from the other states of the same component */

    // then
    results.forEach((result: any) => expect(result).toHaveNoViolations());
});

describe('LoadingState', () => {
    it('renders correctly', () => {
        // given
        render(<LoadingState loading name="LoadedProgressBar" label="progressbar_id" />);
        const loading = document.querySelector('[aria-busy="true"]');

        // when then
        expect(loading).toBeTruthy();
    });

    it('will not render', () => {
        // given
        render(<LoadingState loading name="LoadedProgressBar" label="progressbar_id" />);
        const loading = document.querySelector('[aria-busy="false"]');

        // when then
        expect(loading).not.toBeTruthy();
    });

    it('will render the progressbar type', () => {
        // given
        render(
            <LoadingState
                loading
                name="LoadedProgressBar"
                label="progressbar_id"
                size="large"
                type="progress"
                progress={0.5}
            />
        );

        // when then
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('will render the spinner type', () => {
        // given
        render(
            <LoadingState
                loading
                name="LoadedProgressBar"
                label="progressbar_id"
                size="large"
                type="spinner"
            />
        );
        const loading = document.querySelector('[aria-busy="true"]');

        // when then
        expect(loading).toBeTruthy();
    });
});
