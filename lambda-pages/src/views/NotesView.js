import React, { Component } from 'react';
import { authenticate } from '../helpers/authenticate';
import { connect } from 'react-redux';
import { getAllNotes } from '../actions';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import Notes from '../components/Notes';
import StyledSpinner from '../styles/StyledSpinner';

class NotesView extends Component {
  componentDidMount() {
    authenticate(this.props.getAllNotes);
  }

  handleRedirectToNoteView = id => {
    this.props.history.push(`/note/${id}`);
  };

  render() {
    const { notes, isFetching } = this.props;
    console.log('NOTES VIEW Render');
    return (
      <div className="View NoteView">
        <nav
          style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
        >
          <CSVLink
            data={notes}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <FontAwesomeIcon icon={faFileDownload} />
            <span style={{ fontSize: '1.2rem' }}>CSV</span>
          </CSVLink>
        </nav>
        <h2>Your Notes:</h2>
        {isFetching ? (
          <StyledSpinner />
        ) : (
          <Notes
            FilterResults={this.props.FilterResults}
            notes={notes}
            handleRedirectToNoteView={this.handleRedirectToNoteView}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    isFetching: state.notes.isFetching,
    isDeletingNote: state.notes.isDeletingNote
  };
};

export default connect(
  mapStateToProps,
  { getAllNotes }
)(NotesView);
