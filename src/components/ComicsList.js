import React, {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Comic from "./Comic";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const ComicsList = ({characterId}) => {

    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8080/characters/` + characterId)
            .then(res => {
                setComics(res.data);
                setLoading(false);
            })

    }, [characterId]);

    const classes = makeStyles(theme => ({
        root: {
            width: '70%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        container: {
            width: '100%',
        }
    }));
    return(
        <React.Fragment>
            {loading && <CircularProgress />}
            <div className={classes.container}>

                <List className={classes.root}>
                    {comics.map(item => (
                        <Comic comic={item}/>
                    ))
                    }
                </List>
            </div>
        </React.Fragment>
    );

};

export default ComicsList;