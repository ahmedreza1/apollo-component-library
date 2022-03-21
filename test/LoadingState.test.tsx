import React from 'react';
import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import { LoadingState } from '../src';

it('...', async () => {
    // given: you need to test all variants of this component, make sure all states are present
    const { container: progressBar } = render(
        <LoadingState
            loading
            size="large"
            type="progress"
            progress={0.5}
            name="LoadingState"
            label="progressbar_id"
        />
    );

    render(
        <LoadingState size="large" type="spinner" loading name="LoadingState" label="spinner_id" />
    );

    userEvent.click(screen.getAllByTitle(/loadingstate/i)[0]);
    // eslint-disable-next-line prefer-destructuring
    const loader = screen.getAllByTitle(/LoadingState/i)[0];

    // when
    const results = [];
    results[0] = await axe(progressBar);
    if (loader?.parentElement?.parentElement)
        results[1] = await axe(loader.parentElement.parentElement);

    // then
    results.forEach((result: any) => expect(result).toHaveNoViolations());
});

describe('LoadingState', () => {
    it('complies with WCAG 2.0', async () => {
        // given: you need to test all variants of this component, make sure all states are present
        const { container: progressBar } = render(
            <LoadingState
                loading
                size="large"
                type="progress"
                progress={0.5}
                label="progressbar_id"
            />
        );

        const { container: spinner } = render(
            <LoadingState size="large" type="spinner" loading label="spinner_id" />
        );

        // when
        const results = [];
        results[0] = await axe(progressBar);
        results[1] = await axe(spinner);

        // then
        results.forEach((result: any) => expect(result).toHaveNoViolations());
    });

    it('renders correctly', () => {
        // given
<<<<<<< HEAD
        render(<LoadingState loading name="LoadedProgressBar" label="progressbar_id" />);
=======
        render(<LoadingState loading label="progressbar_id" />);
>>>>>>> 50f2fb0cfe35609d33e4c268c392a1fba059ccd6
        const loading = document.querySelector('[aria-busy="true"]');

        // when then
        expect(loading).toBeTruthy();
    });

    it('will not render', () => {
        // given
<<<<<<< HEAD
        render(<LoadingState loading name="LoadedProgressBar" label="progressbar_id" />);
=======
        render(<LoadingState loading label="progressbar_id" />);
>>>>>>> 50f2fb0cfe35609d33e4c268c392a1fba059ccd6
        const loading = document.querySelector('[aria-busy="false"]');

        // when then
        expect(loading).not.toBeTruthy();
    });

    it('will render the progressbar type', () => {
        // given
        render(
            <LoadingState
                loading
<<<<<<< HEAD
                name="LoadedProgressBar"
=======
>>>>>>> 50f2fb0cfe35609d33e4c268c392a1fba059ccd6
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
<<<<<<< HEAD
        render(
            <LoadingState loading name="Spinner" label="spinner_id" size="large" type="spinner" />
        );
        const loading = document.querySelector('[aria-busy="true"]');
=======
        render(<LoadingState loading label="spinner_id" size="large" type="spinner" />);
>>>>>>> 50f2fb0cfe35609d33e4c268c392a1fba059ccd6

        // when then
        expect(screen.queryByLabelText('spinner_id')).toBeInTheDocument();
    });
});
