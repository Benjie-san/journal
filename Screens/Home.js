import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import React, {useState} from 'react';

export default function Home() {

  const [visible, setVisible] = useState(false);
  const [visibleDisplay, setVisibleDisplay] = useState(false);
  const [note, setNotes] = useState([]);
  const [date, setDate] = useState("");
  const [scripture, setScripture] = useState("");
  const [observation, setObservation] = useState("");
  const [application, setApplication] = useState("");
  const [prayer, setPrayer] = useState("");
  const [status, setStatus] = useState("");
  const [key, setKey] = useState(0);

  const handleButton = (date, scripture, observation, application, prayer, status)  => {

    if (date == "" && scripture == "" && observation == "" && application == "" && prayer == ""){
      return setVisible(false)
    } 
    let obj = {
      date: date,
      scripture: scripture,
      observation: observation,
      application: application,
      prayer: prayer
    }
    console.log(status);
    if(status == "add"){
      setNotes([...note, obj]);
    }

    setDate("");
    setScripture("");
    setObservation("");
    setApplication("");
    setPrayer("");

    if(status == "ongoing"){
      //updating the item
      if(date != note[key].date){
        note[key].date = date;
      }
      if(scripture != note[key].scripture){
        note[key].scripture = scripture;
      }
      if(observation != note[key].observation){
        note[key].observation = observation;
      }
      if(application != note[key].application){
        note[key].application = application;
      }
      if(prayer != note[key].prayer){
        note[key].prayer = prayer;
      }
      setVisibleDisplay(false);
    }else{
      setVisible(false);
    }
  }
  const handleChangeText = (text, valueFor) =>{
    switch(valueFor){
      case 'date': 
            setDate(text) ;break;
      case 'scripture': setScripture(text) ;break;
      case 'observation': setObservation(text) ;break;
      case 'application': setApplication(text) ;break;
      case 'prayer': setPrayer(text) ;break;
      
    }
  }

  const handleVisibleModal = (key) => {
    setVisibleDisplay(true);
    setStatus("ongoing");
    setDate(note[key].date);
    setScripture(note[key].scripture);
    setObservation(note[key].observation);
    setApplication(note[key].application);
    setPrayer(note[key].prayer);
    setKey(key);
  };

  const handleAddButton = () => {
    setStatus("add");
    setVisible(true)
  }

  const noteList = note.map( (item,key) =>
      <TouchableOpacity key={key} onPress={ ()=> handleVisibleModal(key) } style={styles.border} >
        <Text>Date: {item.date}</Text>
        <Text>Scripture: {item.scripture}</Text> 
        </TouchableOpacity>
    
    );

  const handleDelete = () => {
      note.splice(key, 1);
      setVisibleDisplay(false);
  }

  return (
  <>
    {/*MAIN VIEW*/}
    <View style={[styles.homeContainer, styles.flex]}>
      <Text>Home</Text>

      <View style={styles.notelist}>{noteList}</View>
      <Button title="Add Note" onPress={ ()=>handleAddButton() } style={styles.btn}/>
    </View>

    {/*ADD ITEM MODAL*/}
    <ModalComponent visible={visible} handleButton={handleButton} handleChangeText={handleChangeText} date={date} scripture={scripture} observation={observation} application={application} prayer={prayer} status={status}  />
    {/*For displaying the component???*/}
    <ModalComponent visible={visibleDisplay} handleButton={handleButton} handleChangeText={handleChangeText} date={date} scripture={scripture} observation={observation} application={application} prayer={prayer} status={status} handleDelete={handleDelete} />

    </>
  )
}


const ModalComponent = ({visible, handleButton, handleChangeText, date, scripture, observation, application, prayer, status, handleDelete}) =>{
  return(
    <Modal visible={visible} >
    <View style={[styles.modal, styles.flex]}> 
    <Text>Journal Entry</Text>

      <Text>Date</Text>
      <TextInput style={styles.input} editable onChangeText={ text => handleChangeText(text, 'date') } value={date} />        
      
      <Text>Scripture</Text>
      <TextInput style={styles.input} editable onChangeText={ text => handleChangeText(text, "scripture") } value={scripture} />
      
      <Text>Observation</Text>
      <TextInput style={styles.input} editable onChangeText={ text => handleChangeText(text, "observation") } value={observation} />
      
      <Text>Application</Text>
      <TextInput style={styles.input} editable onChangeText={ text => handleChangeText(text, "application")} value={application} />
      
      <Text>Prayer</Text>
      <TextInput style={styles.input} editable onChangeText={ text => handleChangeText(text, "prayer") } value={prayer} />
      
      <Button title="<-" onPress={ ()=>handleButton(date, scripture, observation, application, prayer, status) } />
      
      { 
        status == "ongoing" ? <Button title="delete" onPress={ ()=> handleDelete() }/> : null
      }
      
    </View>
  </Modal>
  );
}


const styles = StyleSheet.create({
  flex:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContainer:{
    backgroundColor: 'gray',
  },
  btn:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  btn2:{
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
  modal:{
    flex:1,
  },
  input:{
    backgroundColor: 'gray',
  },
  border:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  display:{
    backgroundColor: 'gray',
  },
  notelist:{
    borderColor: "red",
    borderWidth: 1,
  },
})