import { TableHeader } from '../constants/types';

interface TableProps<T> {
  data: T[];
  header: TableHeader<T>[];
}

const Table = <T,>({ data, header }: TableProps<T>) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reusable Tailwind CSS Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th key="#" className="px-6 py-3 text-left text-sm font-medium text-gray-700 capitalize">
                #
              </th>
              {header.map((column) => (
                <th key={String(column.id)} className="px-6 py-3 text-left text-sm font-medium text-gray-700 capitalize">
                  {column.label}
                </th>
              ))}
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
                    {String(item[column.id])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
