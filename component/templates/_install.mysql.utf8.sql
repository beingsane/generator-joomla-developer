CREATE TABLE IF NOT EXISTS `#__<%= component %>_<%= editview %>` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,<% if (db.fields.categories) { %>
  `catid` int(11) NOT NULL DEFAULT '0',
  `sid` int(11) NOT NULL DEFAULT '0',
  `title` varchar(250) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',<% if (db.fields.description) { %>
  `description` text NOT NULL,<% } %><% if (db.fields.hits) { %>
  `hits` int(11) NOT NULL DEFAULT '0',<% } %><% if (db.fields.publish) { %>
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out` int(11) NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',<% } %><% if (db.fields.ordering) { %>
  `ordering` int(11) NOT NULL DEFAULT '0',<% } %>
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `access` int(11) NOT NULL DEFAULT '1',<% if (db.fields.params) { %>
  `params` text NOT NULL,<% } %><% if (db.fields.urls) { %>
  `urls` text NOT NULL,<% } %><% if (db.fields.images) { %>
  `images` text NOT NULL,<% } %>
  `language` char(7) NOT NULL DEFAULT '',<% } %><% if (db.fields.timestampt) { %>
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_by` int(10) unsigned NOT NULL DEFAULT '0',
  `created_by_alias` varchar(255) NOT NULL DEFAULT '',
  `modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified_by` int(10) unsigned NOT NULL DEFAULT '0',<% } %><% if (db.fields.metadata) { %>
  `metakey` text NOT NULL,
  `metadesc` text NOT NULL,
  `metadata` text NOT NULL,<% } %><% if (db.fields.featured) { %>
  `featured` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT 'Set if link is featured.',<% } %>
  `xreference` varchar(50) NOT NULL COMMENT 'A reference to enable linkages to external data sets.',<% if (db.fields.publish) { %>
  `publish_up` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `publish_down` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',<% } %>
  PRIMARY KEY (`id`),
  KEY `idx_access` (`access`),<% if (db.fields.publish) { %>
  KEY `idx_checkout` (`checked_out`),
  KEY `idx_state` (`state`),<% } %><% if (db.fields.categories) { %>
  KEY `idx_catid` (`catid`),<% } %><% if (db.fields.timestamp) { %>
  KEY `idx_createdby` (`created_by`),<% } %><% if (db.fields.featured) { %>
  KEY `idx_featured_catid` (`featured`<% if (db.fields.categories) { %>,`catid`<% } %>),<% } %><% if (db.fields.language) { %>
  KEY `idx_language` (`language`),<% } %>
  KEY `idx_xreference` (`xreference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
