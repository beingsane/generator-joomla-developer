<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_<%= component %>
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Weblinks helper.
 *
 * @package     Joomla.Administrator
 * @subpackage  com_<%= component %>
 * @since       1.6
 */
class <%= camelcase %>Helper extends JHelperContent
{
	/**
	 * Configure the Linkbar.
	 *
	 * @param   string  $vName  The name of the active view.
	 *
	 * @return  void
	 *
	 * @since   1.6
	 */
	public static function addSubmenu($vName = '<%= listview %>')
	{
		JHtmlSidebar::addEntry(
			JText::_('COM_<%= language %>__SUBMENU_<%= listlanguage %>'),
			'index.php?option=com_<%= component %>&view=<%= listview %>',
			$vName == '<%= listview %>'
		);
		<% if (db.fields.categories) { %>
		JHtmlSidebar::addEntry(
			JText::_('COM_<%= language %>__SUBMENU_CATEGORIES'),
			'index.php?option=com_categories&extension=com_<%= component %>',
			$vName == 'categories'
		);<% } %>
	}
}
