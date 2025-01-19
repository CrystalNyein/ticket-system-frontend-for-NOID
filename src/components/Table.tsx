import { userRoleOption } from '../constants/common';
import { TableHeader } from '../constants/types';
import { ReactNode } from 'react';

interface TableProps<T> {
  data: T[];
  header: TableHeader<T>[];
  tableRowAction?: (row: T) => ReactNode;
}

const Table = <T,>({ data, header, tableRowAction }: TableProps<T>) => {
  return (
    <div className="w-full py-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-light-orange border-b">
              <th key="#" className="px-6 py-3 text-left text-sm font-bold text-gray-700 capitalize">
                #
              </th>
              {header.map((column) => (
                <th key={String(column.id)} className="px-6 py-3 text-left text-sm font-bold text-gray-700 capitalize">
                  {column.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 capitalize">Manage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                <td key="#" className="px-6 py-4 text-sm text-gray-700">
                  {rowIndex + 1}
                </td>
                {header.map((column) => (
                  <td key={String(column.id)} className="px-6 py-4 text-sm text-gray-700">
                    {column.id === 'role' ? userRoleOption.filter((role) => role.value === item[column.id])[0].label : String(item[column.id])}
                  </td>
                ))}
                {tableRowAction && <td className="px-6 py-4">{tableRowAction(item)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
