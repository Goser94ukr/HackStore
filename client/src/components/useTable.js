import * as React from 'react';
import {alpha} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import {visuallyHidden} from "@mui/utils";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import Switch from "@mui/material/Switch";
import FormControlLabel from '@mui/material/FormControlLabel';


const headCells = [
    {
        id: '_id',
        disablePadding: true,
        label: 'Id',
        hidden: "true",
    },
    {
        id: 'title',
        disablePadding: true,
        label: 'Title',
    },
    {
        id: 'description',
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'developers',
        disablePadding: false,
        label: 'Developers',
    },
    {
        id: 'publishers',
        disablePadding: false,
        label: 'Publishers',
    },
    {
        id: 'gameModels',
        disablePadding: false,
        label: 'Game models',
    },
    {
        id: 'genre',
        disablePadding: false,
        label: 'Genre',
    },    {
        id: 'series',
        disablePadding: false,
        label: 'Series',
    },    {
        id: 'platforms',
        disablePadding: false,
        label: 'Platforms',
    },    {
        id: 'releaseDate',
        disablePadding: false,
        label: 'Release date',
    },
];


class UseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            setOpen: false,
            selected: [],
            order: 'asc',
            orderBy: 'title',
            page: 0,
            dense: false,
            rowsPerPage: 5,
            newValue: {
                title: '',
                description: '',
                developers: '',
                publishers: '',
                gameModels: '',
                genre: '',
                series: '',
                platforms: '',
                releaseDate: ''
            },
            rowCount: 0,
            isItemSelected: 0,
            auth: false,
            anchorEl: null,
        };

        this.initList = this.initList.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAddGame = this.handleAddGame.bind(this);
        this.handleRequestSort = this.handleRequestSort.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteGames = this.handleDeleteGames.bind(this);
        this.descendingComparator = this.descendingComparator.bind(this);
        this.getComparator = this.getComparator.bind(this);
        this.stableSort = this.stableSort.bind(this);
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
        this.GsTableHead = this.GsTableHead.bind(this);
        this.GsTableToolbar = this.GsTableToolbar.bind(this);
        this.GsAddDialog = this.GsAddDialog.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handleChangeDense = this.handleChangeDense.bind(this);
        this.accountMenuClose = this.accountMenuClose.bind(this);

    }

    componentDidMount() {
        this.initList();
    };

    initList() {
        console.log("init OK")
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/games`, {
                method: 'get',
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }).then(response => response.json())
                .then(result => {
                    this.setState({
                        rows: result
                    })
                    resolve(result);
                }).catch(reject);
        });
    };

    descendingComparator(a, b) {
        if (b[this.state.orderBy] < a[this.state.orderBy]) {
            return -1;
        }
        if (b[this.state.orderBy] > a[this.state.orderBy]) {
            return 1;
        }
        return 0;
    }

    getComparator(a, b) {
        return this.state.order === 'desc'
            ? this.descendingComparator(a, b)
            : -this.descendingComparator(a, b);

    }

    stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    handleClickOpen = () => {
        this.setState({setOpen: true});
    };

    handleClose = (e) => {
        this.setState({setOpen: false});
    };

    handleAddGame() {
        const newValue = this.state.newValue

        fetch(`http://localhost:8000/games/create`, {
            method: 'post',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(newValue)
        });
        this.handleClose();
        this.initList();
    }

    handleDeleteGames = () => {
        const selected = this.state.selected;

        if(selected.length > 1) {
            fetch(`http://localhost:8000/games/delete/`, {
                method: 'delete',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(selected)
            });
        } else {
            fetch(`http://localhost:8000/games/delete/${selected.toString()}`, {
                method: 'delete',
                headers: {'Content-Type': "application/json;charset=utf-8"},
                body: JSON.stringify(selected)
            });
        }
        this.setState({
            selected: []
        });
        this.initList();
    };

    handleChange = (e) => {
        const {id, value} = e.target;
        this.setState(prevState => {
            let newValue = Object.assign({}, prevState.newValue);
            newValue[id] = value;
            return { newValue }
        })
    }

    handleRequestSort = (property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order: (isAsc ? 'desc' : 'asc'),
            orderBy: property
        })
    };

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: (parseInt(event.target.value, 10)),
            page: 0
        })
    };

    handleClick = (e) => {
        const selectedIndex = this.state.selected.indexOf(e.target.id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.state.selected, e.target.id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.state.selected.slice(1));
        } else if (selectedIndex === this.state.selected.length - 1) {
            newSelected = newSelected.concat(this.state.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.state.selected.slice(0, selectedIndex),
                this.state.selected.slice(selectedIndex + 1),
            );
        }
        this.setState({
            selected: newSelected,
        });

    };

    handleSelectAllClick = (e) => {
        if(e.target.checked) {
            const newSelecteds = this.state.rows.map((row) => row._id);
            this.setState({
                selected: newSelecteds
            })
            return
        }
        this.setState({
            selected: []
        })
    };

    GsTableHead = (props) => {
        const { order, orderBy, numSelected, rowCount } =
        props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={this.handleSelectAllClick}
                            inputProps={{
                                'label': 'select all games',
                            }}
                        />
                    </TableCell>
                    {headCells.slice(1).map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            // align={headCell.numeric ? 'right' : 'left'}
                            // padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={() => this.handleRequestSort(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    };

    GsTableToolbar = (props) => {
        const { numSelected  } = props

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Games
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={this.handleDeleteGames}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Add game">
                        <IconButton onClick={this.handleClickOpen}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                )}
                <this.GsAddDialog />
            </Toolbar>
        )
    };

    GsAddDialog = () => {

        return (
            <Dialog open={this.state.setOpen} onClose={this.handleClose}>
                <DialogTitle>Add game</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the details of the new game
                    </DialogContentText>
                    { headCells.slice(1).map((headCell => (
                        <TextField
                            id={headCell.id}
                            autoFocus
                            margin="dense"
                            label={headCell.label}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        >
                        </TextField>
                    )))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button onClick={this.handleAddGame}>Add</Button>
                </DialogActions>
            </Dialog>
        )
    }

    isSelected = (id) => this.state.selected.indexOf(id) !== -1;

    handleChangeDense = (e) => {
        this.setState({
            dense: e.target.checked
        })
    }

    accountMenuClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    render () {
        return (

            <Box>
                <Paper >
                    <this.GsTableToolbar numSelected={this.state.selected.length} />
                <TableContainer component={Paper} >
                <Table
                    label="games table"
                    size={this.state.dense ? 'small' : 'medium'}>
                    <this.GsTableHead
                        numSelected={this.state.selected.length}
                        order={this.state.order}
                        orderBy={this.state.orderBy}
                        rowCount={this.state.rows.length}
                    />
                    <TableBody>
                        {this.stableSort(this.state.rows, this.getComparator)
                            .slice(this.state.page * this.state.rowsPerPage,  this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                            .map((row) => {
                                const isItemSelected = this.isSelected(row._id);
                                return (
                                    <TableRow
                                        hover
                                        key={row._id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding='checkbox'>
                                            <Checkbox
                                                id={row._id}
                                                color="primary"
                                                checked={isItemSelected}
                                                onClick={this.handleClick}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">{row.title}</TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                        <TableCell align="right">{row.developers}</TableCell>
                                        <TableCell align="right">{row.publishers}</TableCell>
                                        <TableCell align="right">{row.gameModels}</TableCell>
                                        <TableCell align="right">{row.genre.join(", ")}</TableCell>
                                        <TableCell align="right">{row.series}</TableCell>
                                        <TableCell align="right">{row.platforms.join(", ")}</TableCell>
                                        <TableCell align="right">{row.releaseDate}</TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.state.rows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={this.state.dense} onChange={this.handleChangeDense} />}
                    label="Dense padding"
                    position="start"
                />
            </Box>
        );
    }
}

export default  UseTable

