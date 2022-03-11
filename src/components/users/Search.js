import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';


const Search = ({searchUsers, showClear, clearUsers, showAlert}) => {

    const [text, setText] = useState('');
    //after form submit
    const onSubmit = e => {
       e.preventDefault();
       if (text === "") {
           showAlert('please enter something', 'light')
       } else {
            searchUsers(text);
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
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
}
export default Search
