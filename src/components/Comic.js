import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const Comic = ({comic}) => {

    const handleDescription = (comic) => {
        let description = "";
        if(comic.variantDescription && comic.variantDescription != null) {
            description += 'Variant: ' + comic.variantDescription;
        }
        if(comic.description && comic.description != null) {
            description += ' Description: ' + comic.description
        }
        if(comic.pageCount && comic.pageCount != null) {
            description += ' Pages: ' + comic.pageCount
        }

        return description;
    };

    return(
        <React.Fragment>
            <ListItem
                alignItems="flex-start"
                key={comic.id}>
                <ListItemAvatar key={comic.id + 'avatar'}>
                    <Avatar src={comic.thumbnail.path + '.' + comic.thumbnail.extension} key={comic.id + 'avatar'} />
                </ListItemAvatar>
                <ListItemText
                    key={comic.id + 'text'}
                    primary={comic.title}
                    secondary={handleDescription(comic)}
                />
            </ListItem>
            <Divider variant="inset" component="li" key={comic.id + 'divider'} />
        </React.Fragment>
    );
};

export default Comic;