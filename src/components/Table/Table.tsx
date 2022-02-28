import type { HTMLAttributes, FC } from 'react';
import React, { useState } from 'react';
import * as CSS from 'csstype';
import './Table.css';

export interface Props extends HTMLAttributes<HTMLHRElement> {
    /** width of desired table */
    width?: CSS.Property.Width;
    /** height of table in pixels */
    height?: CSS.Property.Height;
    /** Defines how many rows to show per page */
    pageSize?: number;
    /** Defines number of page to start from */
    pageNum?: number;
    /** Defines the name of colloumns in the header */
    colNames?: [];
    /** Data in JSON to feed the table */
    data?: JSON[];
    // Header Style Props//
    /** Defines the color of the cell text */
    cellTextColor?: CSS.Property.Color;
    /** Defines the case of the cell text */
    cellTextTransform?: CSS.Property.TextTransform;
    /** Defines the weight of the cell text */
    cellTextFontWeight?: CSS.Property.FontWeight;
    // Header Style Props//
    /** Defines the color of the header text */
    headerTextColor?: CSS.Property.Color;
    /** Defines the case of the header text */
    headerTextTransform?: CSS.Property.TextTransform;
    /** Defines the weight of the header text */
    headerTextFontWeight?: CSS.Property.FontWeight;
}
const btnStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
};
/**
 * Component that serves as an table for ease of templating
 *
 * @return Table component
 */
export const Table: FC<Props> = ({
    data = [],
    colNames = [],
    pageNum = 0,
    pageSize = 15,
    width = '100%',
    height = '100%',
    cellTextColor = 'black',
    cellTextTransform = 'capitalize',
    cellTextFontWeight = 'normal',
    headerTextColor = 'white',
    headerTextTransform = 'uppercase',
    headerTextFontWeight = 'bolder',
}) => {
    const [page, setPage] = useState(pageNum);
    const [sorted, setsorted] = useState(data);

    /** Function to sort ascending order */
    const ascOrder = (): void => {
        setsorted([].concat(sorted as any).sort((a: any, b: any) => a.id - b.id));
    };

    /** Function to sort descending order */
    const descOrder = (): void => {
        setsorted([].concat(sorted as any).sort((a: any, b: any) => b.id - a.id));
    };
    /** Function to navigate back to the last page */
    const onBack = (): void => {
        setPage(page - 1 > -1 ? page - 1 : page);
    };

    /** Function to navigate back to the next page */
    const onNext = (): void => {
        setPage(page + 1 < data.length / pageSize ? page + 1 : page);
    };
    return (
        <div className="apollo-component-library-table-component-container">
            {sorted.length > 0 && (
                <table
                    className="apollo-component-library-table-component"
                    cellSpacing="0"
                    style={{ width: width, height: height }}
                >
                    <thead className="header">
                        <tr>
                            {(colNames as any[]).map((headerItem, index) => (
                                <th key={index}>
                                    <span
                                        style={{
                                            color: headerTextColor,
                                            textTransform: headerTextTransform,
                                            fontWeight: headerTextFontWeight,
                                        }}
                                    >
                                        {headerItem.toUpperCase()}
                                    </span>
                                    <button title={headerItem + 'ASC'} onClick={() => ascOrder()}>
                                        ↑
                                    </button>
                                    <button title={headerItem + 'DESC'} onClick={() => descOrder()}>
                                        ↓
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(sorted)
                            .slice(pageSize * page, pageSize * page + pageSize)
                            .map((obj, index) => (
                                <tr key={index}>
                                    {Object.values(obj).map((value, index2) => (
                                        <td
                                            style={{
                                                color: cellTextColor,
                                                textTransform: cellTextTransform,
                                                fontWeight: cellTextFontWeight,
                                            }}
                                            key={index2}
                                        >
                                            {' '}
                                            {value}{' '}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                    <tfoot className="apollo-component-library-table-component-footer">
                        <div>
                            <button style={btnStyle} onClick={onBack}>
                                Back
                            </button>
                            <label style={{ padding: '0 1em' }}>{page + 1}</label>
                            <button style={btnStyle} onClick={onNext}>
                                Next
                            </button>
                        </div>
                    </tfoot>
                </table>
            )}
        </div>
    );
};
