import * as React from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ICreateProjectProps } from '../../interfaces'

const addProject = gql`
  mutation CreateProject($name: String) {
    createProject(name: $name) {
      _id
      name
    }
  }
`;

const createProject : React.SFC<ICreateProjectProps> = (props) => {
  let input: any

  return (
    <Mutation mutation={addProject} >
      {(create, { loading }) => {

        if(loading) {
          return "Loading"
        }

        return (
        <div>
          <p className="title">Create new project</p>
          <form
            onSubmit={e => {
              e.preventDefault();
              create({ variables: { name: input.value } });
              input.value = "";
            }}
          > 
            <div className="field">
              <input className="input"
                ref={node => {
                  input = node;
                }}
              />
            </div>
            <button className="button is-primary" type="submit">Add Project</button>
          </form>
        </div>
        )
      }}
    </Mutation>
  );
};

export default createProject