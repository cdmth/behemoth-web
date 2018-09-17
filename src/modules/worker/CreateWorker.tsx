import * as React from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ICreateWorkerProps } from '../../interfaces'

const addWorker = gql`
  mutation CreateWorker($name: String) {
    createWorker(name: $name) {
      _id
      name
    }
  }
`;

const createWorker : React.SFC<ICreateWorkerProps> = (props) => {
  let input: any

  return (
    <Mutation mutation={addWorker} >
      {(create, { loading }) => {

        if(loading) {
          return "Loading"
        }

        return (
        <div>
          <p className="title">Create new Worker</p>
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
            <button className="button is-primary" type="submit">Add Worker</button>
          </form>
        </div>
        )
      }}
    </Mutation>
  );
};

export default createWorker