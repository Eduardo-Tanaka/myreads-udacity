import React from 'react'
import PropTypes from 'prop-types'

// Essa classe representa o select dos status dos livros
class SelectStatus extends React.Component {
  render() {
    return (
      <select onChange={this.props.changeStatus} value={this.props.selected}>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        {!this.props.searchPage && <option value="none">None</option>}
      </select>
    )
  }
}

SelectStatus.propTypes = {
  changeStatus: PropTypes.func,
  selected: PropTypes.string,
  searchPage: PropTypes.bool
}

export default SelectStatus