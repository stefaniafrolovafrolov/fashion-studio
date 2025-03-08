function getVisibleFilter(comment) {
  return {
    local: false,
    name: comment.name,
    date: comment.date,
    text: comment.text,
    rate: comment.rate,
    id: comment.id,
  };
}

function getDelayedFilter(comment) {
  return {
    local: true,
    id: comment.id,
  };
}

function getManagedFilter(comment) {
  return {
    local: true,
    name: comment.name,
    date: comment.date,
    text: comment.text,
    rate: comment.rate,
    id: comment.id,
  };
}

module.exports = { getVisibleFilter, getDelayedFilter, getManagedFilter };
