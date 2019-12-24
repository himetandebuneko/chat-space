class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :device_controller?

  protected

  def configure_permitted_parameters
    device_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
