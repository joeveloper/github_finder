import React from 'react';
import PropTypes from 'prop-types';
import { useState, useContext} from 'react';
import GithubContext from '../../context/github/githubContext';


const Search = ({showAlert}) => {

    const githubContext = useContext(GithubContext)

    const { users, clearUsers} = githubContext; 


    const [text, setText] = useState('');
    //after form submit
    const onSubmit = e => {
       e.preventDefault();
       if (text === "") {
           showAlert('please enter something', 'light')
       } else {
            githubContext.searchUsers(text);
            setText('');
    }
}

    //after entering your searc text
    const onChange = (e) => {
        setText(e.target.value)
    }

        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input 
                    type="text" 
                    name="text"  
                    placeholder='Search users...'
                    value={text} 
                    onChange={onChange}
                    />
                    <input type="submit" value="Search" className='btn btn-dark btn-block'/>
                </form>


                {users.items && users.items.length > 0 && (<button className="btn btn-light btn-block" 
                onClick={clearUsers}>Clear</button>
                )}       
            </div>
        )
}
 //declaring prop types to control data type
//  Search.propTypes = {
//     showAlert: PropTypes.func.isRequired
// }
export default Search
