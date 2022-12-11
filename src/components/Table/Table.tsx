import React from "react";
import clsx from "clsx";
import "./Table.css";

export interface ITableHeader {
  key: string;
  text: React.ReactNode;
  render?: (any: any) => void;
}

export interface ITable {
  headers: ITableHeader[];
  items: Array<any>;
  className?: string;
  loading?: boolean;
}

const TableNotFound = ({ colSpan }: { colSpan: number }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="py-5 px-8 text-center">
        Kayıt Bulunamadı
      </td>
    </tr>
  );
};
const TableLoading = ({ colSpan }: { colSpan: number }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="py-5 px-8 text-center">
        Yükleniyor
      </td>
    </tr>
  );
};

const Table = ({ headers = [], items = [], className = "", loading = false, ...props }: ITable) => {
  const _getHeaders = headers.map((header) => (
    <th className="p-4 text-left text-headline-01 text-gray-light uppercase" key={header.key}>
      {header.text}
    </th>
  ));
  const _getItems = items.map((item, k) => (
    <>
      {item.beforeRow ? (
        <tr key={`beforeRow_${k.toString()}`} className={clsx("border-b border-b-jet-100")}>
          <td colSpan={headers.length} className="py-5 px-8 text-left">
            {item.beforeRow}
          </td>
        </tr>
      ) : (
        <></>
      )}
      <tr key={`row_${k.toString()}`} className={clsx("border-b border-b-jet-100 last:border-b-0")}>
        {headers.map((header) => (
          <>
            {header.render ? (
              header.render(item)
            ) : (
              <td key={header.key} className="py-5 px-8 text-left">
                {item[header.key]}
              </td>
            )}
          </>
        ))}
      </tr>
      {item.afterRow ? (
        <tr key={`afterRow_${k.toString()}`} className={clsx("border-b border-b-jet-100 last:border-b-0")}>
          <td colSpan={headers.length} className="py-5 px-8 text-left">
            {item.afterRow}
          </td>
        </tr>
      ) : (
        <></>
      )}
    </>
  ));

  return (
    <div className={"overflow-hidden"}>
      <table className={clsx("w-full border-collapse", className)} {...props}>
        <thead data-testid="tableHeader" className={"border-t border-b border-gray"}>
          <tr className="text-body text-jet">{_getHeaders}</tr>
        </thead>
        <tbody data-testid="tableBody" className="text-h6 text-white">
          {loading ? (
            <TableLoading colSpan={headers.length} />
          ) : items.length ? (
            _getItems
          ) : (
            <TableNotFound colSpan={headers.length} />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);
