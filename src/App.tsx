import Info from "./user profile/info"
import { Followers } from "./user profile"
import {Following} from "./user profile"
import {PostsAndReels} from "./user profile"
import { Button } from "./components/ui"

const App = (): JSX.Element => {
  return (
    <div>
      <Info />
      <Followers />
      <Following />
      <PostsAndReels />
      <Button variant={"outline"}>
        click
      </Button>
    </div>
  )
}

export default App
