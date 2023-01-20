import { Input } from "antd";
import { useState } from "react";

interface SearchFieldProps {
  id?: string;
  dataSource: any[];
  setDataSource: Function;
  setLoading: Function;
  fieldSearch: string;
  style?: any;
}

const SearchField: React.FC<SearchFieldProps> = (props) => {
  const { id, dataSource, fieldSearch, setDataSource, setLoading, style } = props;
  const [searchTimeout, setSearchTimeout] = useState(setTimeout(() => {}));

  const search = (value: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    if (value?.length) {
      setLoading(true);
      const timeout = setTimeout(() => {
        const filteredDataSource = dataSource.filter((item: any) =>
          item[fieldSearch].toLowerCase().includes(value.toLocaleLowerCase())
        );
        setDataSource(filteredDataSource);
        setLoading(false);
      }, 800);
      setSearchTimeout(timeout);
    } else {
      setDataSource(dataSource);
      setLoading(false);
    }
  };

  return (
    <Input
      id={id}
      placeholder="Search..."
      onChange={(e) => search(e.target.value)}
      style={style || { width: "100%", marginBottom: "10px" }}
    />
  );
};

export default SearchField;
