import React from 'react';

//component which displays a user's data
const User = props => {


    return(
        <div data-cy={`user-component-${props.user.id}`}>
         
            <p>{props.user.email}</p>
            <p>{props.user.password}</p>
            
        </div>
    )
}

export default User;