import { General } from './pages'
import { RoleModal } from './pages/General/components/role-modal/role-modal';
import { useRole } from './store';

const App = () => {
  const {role, actions} = useRole((state)=> state)

  if(!role){
    return <RoleModal onChagneRole={actions.setRole}/>
  }

  return (
    <General/>
  )
}

export default App
