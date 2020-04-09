// Jay- Funcional hook state for conditional Rendering of ProjectList / New Project Tab on client home screen. Was re-factored into class. In case we go back to function

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