// react Lib imports
import React from 'react';

// third-party imoports
import PropTypes from 'prop-types';

// styles
import './Table.scss';

/**
 * This component displays a table with props data and configurations
 *
 * @class Table
 */
const Table = ({ config, headers, data }) => {
  /**
   *  Renders Table headers
   *
   * @returns {JSX} JSX
   */
  const renderTableHeader = () => {
    return (
      <div className="table-row table-header">
        {headers.map(header => (
          <span
            key={header}
            className={`${config[header].width || 'table-col'}`}
          >
            {config[header].alias ? config[header].alias : header}
          </span>
        ))}
      </div>
    );
  };

  /**
   * Renders Table Body
   *
   * @returns {JSX} JSX
   */
  const renderTableBody = () => {
    const updatedData = data.map((item, index) => {
      item['serial'] = index + 1;
      return item;
    });

    return (
      <div>
        {updatedData && updatedData.map((row, id) => (
          <div className="table-row" key={id}>
            {headers.map(header => (
              <span
                className={`${config[header].width || 'table-col'}`}
                key={header}
              >
                {row[header]}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="table-wrapper">
      {renderTableHeader()}
      {renderTableBody()}
    </div>
  );
};

Table.propTypes = {
  config: PropTypes.object,
  headers: PropTypes.array,
  data: PropTypes.array,
};

export default Table;
