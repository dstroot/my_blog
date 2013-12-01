# This is one way to pass some data (API tokens, etc.) to your Jekyll
# templates without putting it in your _config.yml file (which is
# likely to be committed in your GitHub repository

# In a Liquid template, that information will be available through the site object. For example, _layouts/default.html could contain:

# <head>
#    <!-- ... -->
#   {% if site.env == 'production' %}
#     <link rel="stylesheet" href="/build/style.min.css">
#   {% else %}
#     <link rel="stylesheet" href="/style.css">
#   {% endif %}
# </head>

# Running jekyll build will use style.css by default. If you set export JEKYLL_ENV=production before running jekyll build, it will use style.min.css.

# Plugin to add environment variables to the `site` object in Liquid templates
module Jekyll

  class EnvironmentVariablesGenerator < Generator

    def generate(site)
      site.config['env'] = ENV['JEKYLL_ENV'] || 'development'
      # Add other environment variables to `site.config` here...
    end

  end

end
