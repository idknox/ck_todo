class TodoSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :completed_at
end