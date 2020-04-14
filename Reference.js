
//in submit

const submit = (e) => {
  e.preventDefault();
  console.log("New Project Props", props);
  props.postProjects(location, date, recording, light);
  setState({
    date: "",
    location: "",
    recording: "",
    light: 1
  });
}


// ClientHomeScreen.js
  [ newProjectViewActive, setNewProjectViewAcitve ] = useState(false);
  [ projectsViewActive, setProjectsViewActive ] = useState(true);
  
  toggleProjectListState() {
    setNewProjectViewAcitve(true)
    setProjectsViewActive(false)
  }
  
  toggleNewProjectState() {
    setNewProjectViewAcitve(true)
    setNewProjectViewAcitve(false)
  }
  handleNewProjectView() {
    return newProjectViewActive ? <NewProject/> :  <ProjectList/>
  }

//   in return
{handleNewProjectView()}

// in ClientHomeToggle to call 
<TouchableOpacity style={styles.projectsButton}
onPress={toggleNewProjectState}>


  -------------------

