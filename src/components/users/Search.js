import React from 'react';
import { useState, useContext} from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';


const Search = () => {

    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext)

    const { users, clearUsers} = githubContext; 


    const [text, setText] = useState('');
    //after form submit
    const onSubmit = e => {
       e.preventDefault();
       if (text === "") {
           alertContext.setAlert('please enter something', 'light')
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

export default Search
