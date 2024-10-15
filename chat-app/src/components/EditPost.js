import Axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import LoadingIcon from "./LoadingIcon";
import NotFound from "./NotFound";
import Page from "./Page";

function EditPost() {
  const navigate = useNavigate()
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const originalState = {
    title: {
      value: "",
      hasErrors: false,
      message: "",
    },
    body: {
      value: "",
      hasErrors: false,
      message: "",
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0,
    notFound: false
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.isFetching = false;
        return;
      case "titleChange":
        draft.title.value = action.value;
        draft.title.hasErrors = false
        return;
      case "bodyChange":
        draft.body.value = action.value;
        draft.body.hasErrors = false
        return;
      case "submitRequest":
        if(!draft.title.hasErrors && !draft.body.hasErrors){
          draft.sendCount++;
        }
        return;
      case "saveRequestStarted":
        draft.isSaving = true;
        return;
      case "saveRequestFinished":
        draft.isSaving = false;
        return;
      case 'titleRules':
        if(!action.value.trim()){
          draft.title.hasErrors = true;
          draft.title.message = "You must provide a Title."
        }
        return;
        case 'bodyRules':
        if(!action.value.trim()){
          draft.body.hasErrors = true;
          draft.body.message = "You must provide a Body."
        }
        return;
        case 'notFound':
          draft.notFound = true;
          return
      default:
        return draft;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, originalState);

  function submitHandler(e) {
    e.preventDefault();
    dispatch({type: "titleRules", value:state.title.value})
    dispatch({type: "bodyRules", value:state.body.value})
    dispatch({ type: "submitRequest" });
  }

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${state.id}`, {
          cancelToken: ourRequest.token,
        });
        if(response.data){
          dispatch({ type: "fetchComplete", value: response.data });
          if(appState.users.username !== response.data.author.username){
            appDispatch({type:'flashMessage', value:"You do not have Permission to Edit this post"})
            navigate('/')
          }
        }else{
          dispatch({type:'notFound'})
        }
      } catch (e) {
        console.log("There was a problem or the request was cancelled.");
      }
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" });
      const ourRequest = Axios.CancelToken.source();
      async function fetchPost() {
        try {
          const response = await Axios.post(
            `/post/${state.id}/edit`,
            {
              title: state.title.value,
              body: state.body.value,
              token: appState.users.token,
            },
            { cancelToken: ourRequest.token }
          );
          dispatch({ type: "saveRequestFinished" });
          appDispatch({ type: "flashMessage", value: "Post was updated." });
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchPost();
      return () => {
        ourRequest.cancel();
      };
    }
  }, [state.sendCount]);

  if(state.notFound){
    return(
      <NotFound />
    )
  }

  if (state.isFetching)
    return (
      <Page title="...">
        <LoadingIcon />
      </Page>
    );

  return (
    <Page title="Edit Post">
      <Link className="small font-weight-bold" to={`/post/${state.id}`}>&laquo; Back to Post</Link>
      <form className="mt-3" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
          onBlur={(e) => dispatch({type: 'titleRules', value: e.target.value}) }
            onChange={(e) =>
              dispatch({ type: "titleChange", value: e.target.value })
            }
            value={state.title.value}
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
          />
          {state.title.hasErrors && (
            <div className="alert alert-danger small liveValidateMessage">
              {state.title.message}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
          onBlur={(e) => dispatch({type: 'bodyRules', value: e.target.value})}
            onChange={(e) =>
              dispatch({ type: "bodyChange", value: e.target.value })
            }
            name="body"
            id="post-body"
            className="body-content tall-textarea form-control"
            type="text"
            value={state.body.value}
          />
           {state.body.hasErrors && (
            <div className="alert alert-danger small liveValidateMessage">
              {state.body.message}
            </div>
          )}
        </div>

        <button className="btn btn-primary" disabled={state.isSaving}>
          Save Updates
        </button>
      </form>
    </Page>
  );
}

export default EditPost;
