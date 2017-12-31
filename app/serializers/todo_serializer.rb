class TodoSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :completed_at,
             :completed?

  def completed?
    object.completed_at.present?
  end
end