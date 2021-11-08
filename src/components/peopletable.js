import { Table, Tag, Button } from 'antd';
import axios from "../http"

const { Column, ColumnGroup } = Table;


const PeopleTable = ({data, date}) => {

  const handleDoneClick = (reservation_id) => {
    console.log(date);
    console.log(reservation_id);
    axios.patch(date + "/" + reservation_id)
  };

  return (
    <Table dataSource={data}>
      <Column
        title="Reservation ID"
        dataIndex="reservation_id"
        key="name"
      />
      <ColumnGroup colSpan="2" title="Name">
        <Column title="First Name" dataIndex="name" key="name" />
        <Column title="Last Name" dataIndex="surname" key="surname" />
      </ColumnGroup>
      <Column title="Birth Date" dataIndex="birth_date" key="birth_date" />
      <Column title="Address" dataIndex="address" key="address" />
      <Column title="Occupation" dataIndex="occupation" key="occupation" />
      <Column
        title="Status"
        dataIndex="vaccinated"
        key="vaccinated"
        render={(status) => {
          return (
            <div>
              {status ? (
                <Tag color="green">Done</Tag>
              ) : (
                <Tag color="red">Not yet</Tag>
              )}
            </div>
          );
        }}
      />
      <Column
        title="Action"
        dataIndex="action"
        key="action"
        render={(_, record) => {
          return (
            <div className="space-x-3">
              <Button onClick={() => handleDoneClick(record.reservation_id)} type="primary"> Done </Button>
              <Button type="danger"> Cancel </Button>
            </div>
          );
        }}
      />
    </Table>
  ); 
}

export default PeopleTable