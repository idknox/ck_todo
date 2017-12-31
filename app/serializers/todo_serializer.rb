class TodoSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :completed_at

  def completed?
    completed_at.present?
  end
end