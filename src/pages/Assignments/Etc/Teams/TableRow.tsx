import {GiCrossMark} from 'react-icons/gi'

export const TableRow = ({ personDetails }) => {
    return (
      <>
      <tr>
        <td></td>
        <td></td>
        <td>Unity ID</td>
        <td></td>
      </tr>
      {personDetails.map((person, index) => (
        <tr key={index}>
          <td style={{paddingLeft:'20px'}}>{index+1}</td>
          <td></td>
          <td>{person.email}</td>
          <td>
            <a href="https://google.com">
              <GiCrossMark color="red" size={20}/>
            </a>
          </td>
        </tr>
      ))}
      </>
    );
  };
  