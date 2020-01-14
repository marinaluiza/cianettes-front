import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from "@material-ui/core/Avatar/Avatar";
import ComicsList from "./ComicsList";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const CharactersList = () => {

    const [characters, setCharacters] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8080/characters`)
            .then(res => {
                 setCharacters(res.data);
                 setLoading(false)
            })

    }, []);

    const classes = useStyles();

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return(
        <div>
            {loading && <CircularProgress />}
            {characters.map((item)=> {
                return(
                    <ExpansionPanel expanded={expanded === item.id} onChange={handleChange(item.id)} key={item.id}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={"panel-content" + item.id}
                            id={"panel-header" + item.id}
                        >
                            <Avatar src={item.thumbnail.path + '.' + item.thumbnail.extension} className={classes.avatar}/>
                            <Typography className={classes.heading}>{item.name}</Typography>
                            <Typography className={classes.secondaryHeading}>{item.description}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <ComicsList characterId={item.id}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })}
        </div>
    );

};

export default CharactersList;