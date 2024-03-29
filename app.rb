require 'rubygems'
require 'sinatra'
require 'sass'
require 'mongo'
require 'uri'
require 'json'

configure :development do
  ENV['MONGOHQ_URL'] = "mongodb://localhost/photography"
end

get '/css/index.css' do
  scss :"scss/index"
end

get '/projects_template' do 
  haml :projects_template, :layout => false
end

get '/project_template' do 
  haml :project_template, :layout => false
end

get '/animation' do 
  haml :animation
end

get '/projects/:projectName.json' do |projectName|
  Project.find_by_name(projectName).to_json
end

get '/projects.json' do
  Project.all.to_json
end

get '/*' do |projectName|
  haml :index
end

class Project

  class << self 
    def all
      collection.find.map { |p| p }
    end

    def find_by_name name
      collection.find_one({:name => name})
    end

    private

    def get_connection
      return @db_connection if @db_connection
      db = URI.parse(ENV['MONGOHQ_URL'])
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