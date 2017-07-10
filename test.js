var assert = require('assert');
describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value isn\'t present', function(){
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});

/* Testing Notes:
    - Component and containers both need to be rendered in order to test them since they control view
    and the interaction w/ the application.
    - There are 3 important types of rendering options for components:
        1. Shallow - only renders the component specified and doesn't render any child components.
            - This is useful to constrain you test to a component as a unit, and ensure that your
              tests aren't indirectly asserting on behavior of child components.
        2. Static - renders components to static HTML so you can analyze the resulting HTML structure.
            - Useful for generating HTML for an entire set of nested components.
        3. Full DOM - ideal for use cases where you have components that interact w/ DOM APIs, or may
           require the full lifecycle in order to fully test the component.
*/

/* Examples of testing each of the four primary React entity types */

//ComponentTest.tsx
/*
import * as React from 'react';
import { expect } from 'chai';
import { render, shallow } from 'enzyme';
 
import { Header } from './Header';
 
describe('Header', () => {

  it('Contains 2 Links via shallow', () => {
    const shallowHeader = shallow(<Header isLoggedIn={false} />);
    expect(shallowHeader).find('Link')).to.have.length(1);
  });
 
  it('Contains 3 anchors via render', () => {
    const renderHeader = render(<Header isLoggedIn={false} />);
    expect(renderHeader).find('a')).to.have.length(3);
  });
 
  it('Contains no links with active class by default', () => {
    const shallowHeader = shallow(<Header isLoggedIn={false} />);
    expect(shallowHeader).find('.active')).to.have.length(0);
  });

});
//End of ComponentTest.tsx
*/

//ContainerTest.tsx
/*
import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
 
import { ManageUser } from './ManageUser';
 
describe ('Manage User Page', () => {

  it('sets error message on short username', () => {
    const props = {
      actions: { saveUser: () => { return Promise.resolve(); }},
      user: {
        id: 1,
        username: 'abc',
        firstName: 'Micah',
        lastName: 'Netz',
        email: 'micah.netz@example.com'
      }
    };
    const wrapper = mount(<ManageUser {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Username must be at least 5 characters.');
  });

});
//End of ContainerTest.tsx
*/

//ActionsTest.tsx
/*
// Lib
import { expect } from 'chai';
import {} from 'mocha';
 
// Test
import { getMockUserProfile } from '__tests/example_folder';
 
// App
import * as types from '../actionTypes';
import * as userActions from '../actions';
 
describe('redux actions - users', () => {

  const username = 'Test Username';
  const profile = getMockUserProfile();
 
  it('should create an action to login', () => {
    const expectedAction = {
      type: types.LOGIN,
      username,
    };
    expect(userActions.userLogin(username)).to.deep.equal(expectedAction);
  });
 
  it('should create an action to have a login error', () => {
    const err = Error('test error');
    const expectedAction = {
      err,
      type: types.LOGIN_ERROR,
      username,
    };
    expect(userActions.userLoginError(err, username)).to.deep.equal(expectedAction);
  });

});
//End of ActionsTest.tsx
*/

//ReducerTest.tsx
/*
// Lib
import { expect } from 'chai';
import {} from 'mocha';
 
// Test
import { getMockUserProfile } from '__tests/example_folder';
 
// App
import { IUserState, userReducer } from '..';
import * as types from '../actionTypes';
 
describe('redux reducers - users', () => {

  const profile = getMockUserProfile();
  let initialUserState: IUserState;
 
  beforeEach(() => {
    initialUserState = {
      isLoggedIn: false,
      isLoggingIn: false,
    };
  });
 
  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: 'NOOP' })).to.deep.equal(initialUserState);
  });
 
  it('should return the logging in state', () => {
    const returnState = {
      isLoggedIn: false,
      isLoggingIn: true,
    };
    expect(userReducer(initialUserState, { type: types.LOGIN })).to.deep.equal(returnState);
    expect(initialUserState.isLoggingIn, 'initial state should not be mutated').to.be.false;
  });
  
});
//End of ReducerTest.tsx
*/