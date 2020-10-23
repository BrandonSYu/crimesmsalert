import React from 'react';

function Rss(props){//display reciepient data
    return(
        <div>
            {props.items.map(item => (
                <div>
                    <img src={`${item.querySelector("link").innerHTML}`} alt=""/>
                    <h1>
                        <a href={`${item.querySelector("link").innerHTML}`} rel="noopener">
                            {item.querySelector("title").innerHTML}
                        </a>
                    </h1>
                </div>
          ))}
        </div>
    )
}

export default Rss;