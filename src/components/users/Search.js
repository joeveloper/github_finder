import React from 'react';
import PropTypes from 'prop-types';
import { useState, useContext} from 'react';
import GithubContext from '../../context/github/githubContext';


const Search = ({ showClear, clearUsers, showAlert}) => {

    const githubContext = useContext(GithubContext)

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
                {showClear && <button className="btn btn-light btn-block" 
                onClick={clearUsers}>Clear</button>
                }       
            </div>
        )
}
 //declaring prop types to control data type
 Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
}
export default Search
