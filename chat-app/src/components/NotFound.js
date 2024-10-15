import Page from "./Page"
import { Link } from "react-router-dom"
export default function NotFound(){
    return(
        <Page title='Not Found'>
        <div className="text-center">
          <h2>Whoops! We canot Find the Page.</h2>
          <p className="lead text-muted">you can always visit the<Link to='/'> homePage</Link>  for fresh posts.</p>
        </div>
      </Page>
    )
}