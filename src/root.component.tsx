import React from "react";

export default function VitalsParcel(props: VitalsParcelProps) {
  const [encounter, setEncounter] = React.useState(null);
  React.useEffect(() => {
    const queryParams = `
      custom:(obs)
    `.replace(/\s/g, "");

    fetch(
      `/openmrs/ws/rest/v1/encounter?patient=${props.patientUuid}&encounterType=67a71486-1a54-468f-ac3e-7091a9a79584&v=${queryParams}`
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(
            `Cannot fetch encounter ${props.patientUuid} - server responded with '${resp.status}'`
          );
        }
      })
      .then(encounter => {
        setEncounter(encounter.results[0].obs);
        // console.log(encounter.results[0].obs);
      });
  }, []);

  return encounter ? renderEncounter() : renderLoader();

  function renderLoader() {
    return <div>Loading...</div>;
  }

  function renderEncounter() {
    // let vitals: any= {}
    // encounter.forEach(ob => {
    //   if(ob.concept.uuid === '5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'){
    //     vitals.systolicbp = ob.value
    //   }
    //   else if(ob.concept.uuid === '5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'){
    //     vitals.dystolicbp = ob.value
    //   }
    //   else if(ob.concept.uuid === '5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'){
    //     vitals.pulse = ob.value
    //   }
    //   else if(ob.concept.uuid === '5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'){
    //     vitals.temperature = ob.value
    //   }
    //   else if(ob.concept.uuid === '5092 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'){
    //     vitals.oxygen_saturation = ob.value
    //   }
    // });
    return (
      <div className="test">
        <table>
          <thead>
            {encounter.map(vital => (
              <th>{vital.concept.display}</th>
            ))}
            {/* <th>Systolic bp</th>
        <th>Diastolic bp</th>
        <th>Pulse</th>
        <th>Temperature</th>
        <th>Oxygen saturation</th> */}
          </thead>
          <tbody>
            <tr>
              {encounter.map(vital => (
                <td>{vital.value}</td>
              ))}
            </tr>
            {/* <tr>
        <td>{vitals.systolicbp}</td>
        <td>{vitals.dystolicbp}</td>
        <td>{vitals.pulse}</td>
        <td>{vitals.temperature}</td>
        <td>{vitals.oxygen_saturation}</td>
        </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}
type VitalsParcelProps = {
  patientUuid: string;
};
