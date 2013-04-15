require 'rubygems'
require 'sinatra'
require 'sass'
require 'mongo'
require 'uri'


get '/' do
  projects = Project.all
  haml :index, :locals => { :projects => projects }
end

get '/css/index.css' do
  scss :"scss/index"
end

get '/projects/:project_name' do |project_name|
  project = Project.find_by_name project_name
  haml :project, :locals => { :project => project }
end

class Project

  class << self 
    def all
      collection.find
    end

    def find_by_name name
      collection.find_one({:name => name})
    end

    private

    def get_connection
      return @db_connection if @db_connection
      db = URI.parse(ENV['MONGOHQ_URL'])
      p db.host, db.port
      db_name = db.path.gsub(/^\//, '')
      @db_connection = Mongo::Connection.new(db.host, db.port).db(db_name)
      @db_connection.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)
      @db_connection
    end


    def collection
      get_connection.collection("projects")
    end
  end
end